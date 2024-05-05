import { get, writable } from 'svelte/store';
export const modal = writable(false);
export const loginModal = writable(false);
import PocketBase, { type AuthModel } from 'pocketbase';
import {env} from '$env/dynamic/public'
import type { UsersResponse } from './types/pocketbase-types';

export const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL);

export const currentUser = writable(pb.authStore.model as UsersResponse);
export const notification = writable({} as Notif);

// subscibes vars
let userSub = null;
let currentUserWatch = false;

pb.authStore.onChange(async (token, model) => {
    console.log("auth change");
    await watchUserChange(pb.authStore.model);
});

if(pb.authStore.isAuthRecord){
    console.log("auth record yayay");
    await watchUserChange(pb.authStore.model);
}

export async function watchUserChange(user:AuthModel) {
    console.log("watching user change");
    console.log(user);
    if(currentUserWatch == true){
        return
    }
    if(!user?.id){
        return
    }
    currentUserWatch = true;
    
    try {
        if(userSub){
            userSub()
        }
        const getUser = await pb.collection("users").getOne(user.id);
        currentUser.set(getUser);
        const currentUserId = get(currentUser).id
        if (get(currentUser).id) {
            // subscribe to the user data
            let unsubscribe = pb.collection("users").subscribe(user.id, async ({action,  record}) => {
                if (action === "update") {
                    const getUser = await pb.collection("users").getOne(user.id);
                    console.log("user updated");
                    currentUser.set(getUser);
                }

            });
            userSub = async () => {
                (await unsubscribe)();
            }
        }
        
    }
    catch (e) {
        console.log("No user found");
    }
  
}
