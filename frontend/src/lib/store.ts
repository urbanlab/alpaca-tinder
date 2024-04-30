import { get, writable } from 'svelte/store';
export const modal = writable(false);
export const loginModal = writable(false);
import PocketBase from 'pocketbase';
import {env} from '$env/dynamic/public'
import type { UsersResponse } from './types/pocketbase-types';

export const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL);

export const currentUser = writable(pb.authStore.model as UsersResponse);
export const notification = writable({} as Notif);

// subscibes vars
let userSub = null;

pb.authStore.onChange(async () => {
    //currentUser.set(pb.authStore.model);
    await watchUserChange();
});

export async function watchUserChange() {
    console.log("watching user change");
    try {
        if(userSub){
            userSub()
        }
        const getUser = await pb.collection("users").getOne(get(currentUser).id,{expand: "seen"});
        currentUser.set(getUser);
        const currentUserId = get(currentUser).id
        if (get(currentUser).id) {
            // subscribe to the user data
            pb.collection("users").subscribe(get(currentUser).id, async ({action,  record}) => {
                if (action === "update") {
                    const getUser = await pb.collection("users").getOne(get(currentUser).id,{expand: "seen"});
                    console.log("user updated");
                    currentUser.set(getUser);
                }

            });
            userSub = () => {
                pb.collection("users").unsubscribe(currentUserId)
            }
        }
        
    }
    catch (e) {
        console.log("No user found");
    }
  
}
