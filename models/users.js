import mongoose from 'mongoose';

/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({
	email: {
		/* The user email */

		type: String,
		required: [true, 'Please provide a name for this pet.'],
		maxlength: [40, 'Name cannot be more than 60 characters'],
	},
	password: {
		/* The owner of this pet */

		type: String,
		required: [true, "Please provide the pet owner's name"],
	},
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
