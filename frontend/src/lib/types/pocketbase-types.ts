/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Conversations = "conversations",
	Datasets = "datasets",
	Users = "users",
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

export type ConversationsRecord<Tdata = unknown> = {
	data?: null | Tdata
	dataset?: RecordIdString
}

export type DatasetsRecord = {
	conversations?: RecordIdString[]
	name?: string
}

export type UsersRecord = {
	avatar?: string
	name?: string
	seen?: RecordIdString[]
}

// Response types include system fields and match responses from the PocketBase API
export type ConversationsResponse<Tdata = unknown, Texpand = unknown> = Required<ConversationsRecord<Tdata>> & BaseSystemFields<Texpand>
export type DatasetsResponse<Texpand = unknown> = Required<DatasetsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	conversations: ConversationsRecord
	datasets: DatasetsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	conversations: ConversationsResponse
	datasets: DatasetsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'conversations'): RecordService<ConversationsResponse>
	collection(idOrName: 'datasets'): RecordService<DatasetsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
