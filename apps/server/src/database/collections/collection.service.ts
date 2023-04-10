import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// DTO
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

import { Collection } from './entities/collection.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from '@/users/entities/user.entity';
import { Shot } from '@/shots/entities/shot.entity';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
    private dataSource: DataSource,
  ) {}

  async getCollectionsByUser(id: number): Promise<Collection[]> {
    const userCollections = await this.dataSource.getRepository(User).findOne({
      relations: {
        collections: true,
      },
      where: {
        id: id,
      },
    });

    return userCollections.collections;
  }

  async getCollectionById(id: number): Promise<Collection> {
    const collection = await this.collectionRepository.findOne({
      relations: {
        user: true,
      },
      where: { id: id },
    });

    return collection;
  }

  async createCollection(
    createCollectionDto: CreateCollectionDto,
    user: User,
  ): Promise<Collection> {
    // todo
    const collection = this.collectionRepository.create({
      ...createCollectionDto,
      user,
    });
    await this.collectionRepository.save(collection);

    return collection;
  }

  async editCollection(
    id: number,
    updateCollectionDto: UpdateCollectionDto,
    user: User,
  ): Promise<Collection> {
    const collection = await this.collectionRepository.findOne({
      relations: {
        user: true,
      },
      where: {
        id: id,
      },
    });

    const editedCollection = {
      ...collection,
      ...updateCollectionDto,
    };

    if (user.id !== collection.user.id) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    } else {
      await this.collectionRepository.save(editedCollection);
    }

    return editedCollection;
  }

  async deleteCollection(id: number, user: User) {
    // check user own
    const collection = await this.collectionRepository.findOne({
      relations: {
        user: true,
      },
      where: {
        id: id,
      },
    });

    if (collection == null)
      throw new HttpException(
        `no collection with id: ${id}`,
        HttpStatus.BAD_REQUEST,
      );

    if (collection.user.id !== user.id) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    try {
      await this.collectionRepository.delete({ id: id });
    } catch (e) {
      throw new HttpException(
        'failed to delete collection',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { success: `successfully deleted collection ${id}` };
  }

  async addShotToUserCollection(id: number, shotId: number, user: User) {
    const shot = await this.dataSource
      .getRepository(Shot)
      .findOneBy({ id: shotId });

    const collection = await this.collectionRepository.findOne({
      relations: {
        user: true,
        shots: true,
      },
      where: {
        id: id,
      },
    });

    if (collection.user.id !== user.id)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    const checkIfAlreadyAdded = collection.shots.filter(
      (s) => s.id === shot.id,
    );

    if (!checkIfAlreadyAdded.length) {
      collection.shots.push(shot);
      await this.collectionRepository.save(collection);
      return { status: `added shotId: ${shotId} to collection: ${id}` };
    } else {
      return { status: 'Already Added to Collection' };
    }
  }

  async removeShotFromUserCollection(id: number, shotId: number, user: User) {
    const shot = await this.dataSource
      .getRepository(Shot)
      .findOneBy({ id: shotId });

    const collection = await this.collectionRepository.findOne({
      relations: {
        user: true,
        shots: true,
      },
      where: {
        id: id,
      },
    });

    if (collection.user.id !== user.id)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    collection.shots = collection.shots.filter((s) => s.id !== shot.id);

    await this.collectionRepository.save(collection);

    return { status: `Removed shot: ${shotId} from collection` };
  }
}
