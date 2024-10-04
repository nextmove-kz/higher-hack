/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
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

export type UsersRecord = {
	avatar?: string
	name?: string
}

export type VacancyRecord = {
	city?: string
	description?: HTMLString
	email?: string
	salary?: number
	skills?: string
	title?: string
}

// Response types include system fields and match responses from the PocketBase API
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type VacancyResponse<Texpand = unknown> = Required<VacancyRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	users: UsersRecord
	vacancy: VacancyRecord
}

export type CollectionResponses = {
	users: UsersResponse
	vacancy: VacancyResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'users'): RecordService<UsersResponse>
	collection(idOrName: 'vacancy'): RecordService<VacancyResponse>
}
