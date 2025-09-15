const mongoose = require("mongoose");
const skillSchema = require("./skillSchema");
const portfolioSchema = require("./portfolioSchema");

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        },
    },
    googleId: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    accountstatus: {
        type: String,
        enum: ["active", "inactive", "pending", "banned"],
        default: "pending",
    },
    skills: {
        type: [skillSchema],
        default: [],
    },

    verifiedSkills: [
        {
            type: String,
            required: false,
        }
    ],
    portfolioLinks: {
        type: [portfolioSchema],
        default: [],
    },

    certifications: [
        {
            name: {
                type: String,
                required: false,
            },
            status: {
                type: String,
                enum: ["Not-Verified", "IN-Progress", "Verified"],
                default: "Not-Verified",
                required: false,
            }
        }
    ],

    experience: [
        {
            company: {
                type: String,
                required: false,
            },
            role: {
                type: String,
                required: false,
            },
            duration: {
                type: String,
                required: false,
            }
        }
    ],

    education: [
        {
            institution: {
                type: String,
                required: false,
            },
            degree: {
                type: String,
                required: false,
            },
            fieldOfStudy: {
                type: String,
                required: false,
            },
            startDate: {
                type: Date,
                required: false,
            },
            endDate: {
                type: Date,
                required: false,
            }
        }
    ],
    profilePicture: {
        type: String,
        default: "https://placehold.co/200x200"
    },


}, {
    timestamps: true
});
module.exports = mongoose.model("User", userSchema);