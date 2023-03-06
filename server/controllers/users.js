import User from "../models/User.js";

/* READ */

//GET USER
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

//GET USER FRIEND
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

//GET USER FAMILY
export const getUserFamily = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const family = await Promise.all(
            user.family.map((id) => User.findById(id))
        );
        const formattedFamily = family.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFamily);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */

//ADD REMOVE FRIEND
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

//ADD REMOVE FAM(SINGLE FAMILY MEMBER)
export const addRemoveFam = async (req, res) => {
    try {
        const { id, famId } = req.params;
        const user = await User.findById(id);
        const fam = await User.findById(famId);

        if (user.family.includes(famId)) {
            user.family = user.family.filter((id) => id !== famId);
            fam.family = fam.family.filter((id) => id !== id);
        } else {
            user.family.push(famId);
            fam.family.push(id);
        }
        await user.save();
        await fam.save();

        const family = await Promise.all(
            user.family.map((id) => User.findById(id))
        );
        const formattedFamily = family.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFamily);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};