import { User, Shot } from "@drippple/schema";
import axios from "./axios";
import { AxiosResponse } from "axios";
import router from "next/router";

interface CreateShotParams {
	title: string;
	shotImage: string;
	description: string;
	tags: string[];
}

export const createShot = async (
	createShotParams: CreateShotParams
) => {
	// get shot id from backend and redirect to shotDetail page by id
	const {
		data: { id },
	} = await axios.post<
		Shot,
		AxiosResponse<Shot>,
		CreateShotParams
	>("/shots/create", createShotParams);

	// TODO REDIRECTIOn
	console.log(id);
};

interface UpdateShotParams {
	idx: number;
	updateShotDto: CreateShotParams;
}

export const updateShot = async ({
	idx,
	updateShotDto,
}: UpdateShotParams) => {
	const {
		data: { id },
	} = await axios.patch<
		Shot,
		AxiosResponse<Shot>,
		CreateShotParams
	>(`/shots/${idx}/update`, updateShotDto);

	router.push(`/shots/${id}`);
};

export const getShotById = async (id: number) => {
	const { data } = await axios.get<
		Shot,
		AxiosResponse<Shot>
	>(`/shots/${id}`);

	return data;
};
