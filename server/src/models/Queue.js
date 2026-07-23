const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
    {
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },

        currentToken: {
            type: Number,
            default: 0,
        },

        totalTokens: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Queue", queueSchema);