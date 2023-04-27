import { FriendType } from "@/types/social-type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FriendsStoreType {
  friends: FriendType[] | [];
  setFriendList: (friendQuery: any[]) => void;
  resetFriendList: () => void;
}

const useFriendsStore = create<FriendsStoreType>()(
  persist(
    (set) => ({
      friends: [],
      setFriendList: (friendQuery) => {
        const friendList: FriendType[] = [];
        friendQuery.map((query) => {
          friendList.push({
            // id: query.id,
            // nickName: query.nickName,
            // avatar: query.avatar,
            // wins: query.wins,
            // losses: query.losses,
            // online: query.online,
            ...query.friend,
            chatChannel: query.directMessage,
          });
        });
        console.log("firendList: ", friendList);
        set(() => ({
          friends: friendList,
        }));
      },
      resetFriendList: () => {
        set(() => ({
          friends: [],
        }));
      },
    }),
    {
      name: "rgm-friend-state",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useFriendsStore;

// axios get request to be made to
// http://localhost:3000/friend-request/findUserFriendsWithDirectMessage
// JSON Object return Looks like
// {
// 	"friendRequest": {
// 		"id": 10,
// 		"createdAt": "2023-04-10T00:43:45.586Z",
// 		"friendStatus": "accepted"
// 	},
// 	"friend": {
// 		"id": 1,
// 		"nickName": "nazrinshahaf",
// 		"created_at": "2023-03-27T23:11:58.459Z",
// 		"updated_at": "2023-03-28T00:04:42.449Z",
// 		"wins": 0,
// 		"losses": 0,
// 		"online": false
// 	},
// 	"directMessage": {
// 		"id": 117,
// 		"joinedAt": "2023-04-13T00:55:39.876Z",
// 		"isAdmin": false,
// 		"isBlacklisted": false,
// 		"mutedUntil": null,
// 		"chatChannel": {
// 			"id": 87,
// 			"name": null,
// 			"created_at": "2023-04-13T00:55:39.850Z",
// 			"channel_type": "private",
// 			"chatType": "direct_message"
// 		}
// 	}
// },
