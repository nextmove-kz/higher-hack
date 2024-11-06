/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Applications = "applications",
	Chats = "chats",
	Company = "company",
	Experience = "experience",
	Messages = "messages",
	Response = "response",
	Resume = "resume",
	Users = "users",
	Vacancy = "vacancy",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum ApplicationsStatusOptions {
	"created" = "created",
	"accepted" = "accepted",
	"archived" = "archived",
}
export type ApplicationsRecord = {
	resume: RecordIdString
	status: ApplicationsStatusOptions
	vacancy: RecordIdString
}

export type ChatsRecord = {
	is_group?: boolean
	title?: string
	users?: RecordIdString[]
}

export type CompanyRecord = {
	description?: HTMLString
	email?: string
	field?: string
	name?: string
	phone?: string
	user?: RecordIdString
	vacansies?: RecordIdString[]
	website?: string
}

export type ExperienceRecord = {
	company_name?: string
	description?: HTMLString
	end_date?: IsoDateString
	resume?: RecordIdString
	start_date?: IsoDateString
}

export type MessagesRecord = {
	attachments?: string[]
	chat?: RecordIdString
	text: string
	user?: RecordIdString
}

export type ResponseRecord = {
	resume?: RecordIdString
	vacancy?: RecordIdString
	viewed?: boolean
}

export enum ResumeEducationLevelsOptions {
	"bachelor" = "bachelor",
	"masters" = "masters",
	"high school" = "high school",
	"doctorate" = "doctorate",
	"college" = "college",
}

export enum ResumeEmploymentTypeOptions {
	"full_time" = "full_time",
	"part_time" = "part_time",
	"project" = "project",
	"internship" = "internship",
	"volutury" = "volutury",
}
export type ResumeRecord = {
	about?: HTMLString
	age?: number
	city?: string
	education?: string
	education_levels?: ResumeEducationLevelsOptions
	email?: string
	employment_type?: ResumeEmploymentTypeOptions
	experience?: RecordIdString[]
	full_name?: string
	img?: string
	phone_number?: string
	salary?: number
	skills?: string
}

export enum UsersRoleOptions {
	"company" = "company",
	"user" = "user",
}
export type UsersRecord = {
	avatar?: string
	chats?: RecordIdString[]
	company?: RecordIdString
	messages?: RecordIdString[]
	resume?: RecordIdString
	role: UsersRoleOptions
}

export enum VacancyExperienceOptions {
	"none" = "none",
	"1-3" = "1-3",
	"3-6" = "3-6",
	"6+" = "6+",
}

export enum VacancyEmploymentTypeOptions {
	"full_time" = "full_time",
	"part_time" = "part_time",
	"project" = "project",
	"voluntary" = "voluntary",
	"internship" = "internship",
}
export type VacancyRecord = {
	active?: boolean
	city?: string
	company?: RecordIdString
	description?: HTMLString
	email?: string
	employment_type?: VacancyEmploymentTypeOptions
	experience?: VacancyExperienceOptions
	max_salary?: number
	min_salary?: number
	publication_date?: IsoDateString
	remote?: boolean
	skills?: string
	title: string
}

// Response types include system fields and match responses from the PocketBase API
export type ApplicationsResponse<Texpand = unknown> = Required<ApplicationsRecord> & BaseSystemFields<Texpand>
export type ChatsResponse<Texpand = unknown> = Required<ChatsRecord> & BaseSystemFields<Texpand>
export type CompanyResponse<Texpand = unknown> = Required<CompanyRecord> & BaseSystemFields<Texpand>
export type ExperienceResponse<Texpand = unknown> = Required<ExperienceRecord> & BaseSystemFields<Texpand>
export type MessagesResponse<Texpand = unknown> = Required<MessagesRecord> & BaseSystemFields<Texpand>
export type ResponseResponse<Texpand = unknown> = Required<ResponseRecord> & BaseSystemFields<Texpand>
export type ResumeResponse<Texpand = unknown> = Required<ResumeRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type VacancyResponse<Texpand = unknown> = Required<VacancyRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	applications: ApplicationsRecord
	chats: ChatsRecord
	company: CompanyRecord
	experience: ExperienceRecord
	messages: MessagesRecord
	response: ResponseRecord
	resume: ResumeRecord
	users: UsersRecord
	vacancy: VacancyRecord
}

export type CollectionResponses = {
	applications: ApplicationsResponse
	chats: ChatsResponse
	company: CompanyResponse
	experience: ExperienceResponse
	messages: MessagesResponse
	response: ResponseResponse
	resume: ResumeResponse
	users: UsersResponse
	vacancy: VacancyResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'applications'): RecordService<ApplicationsResponse>
	collection(idOrName: 'chats'): RecordService<ChatsResponse>
	collection(idOrName: 'company'): RecordService<CompanyResponse>
	collection(idOrName: 'experience'): RecordService<ExperienceResponse>
	collection(idOrName: 'messages'): RecordService<MessagesResponse>
	collection(idOrName: 'response'): RecordService<ResponseResponse>
	collection(idOrName: 'resume'): RecordService<ResumeResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
	collection(idOrName: 'vacancy'): RecordService<VacancyResponse>
}
