const mongoose = require("mongoose");

const alluserSchema = new mongoose.Schema(
    {
      created: {
        type: Date,
        default: Date.now,
      },
      email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      phoneNumber: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
      },
      password: {
        type: String,
        minlength: 6,
        maxlength: 128,
      },
      username: {
        type: String,
        maxlength: 128,
        index: true,
        trim: true,
      },
      dateofbirth: {
        type: String,
        trim: true,
      },
      gender: {
        type: String,
        trim: true,
      },
      education: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
      services: {
        facebook: String,
        google: String,
      },
      role: {
        type: String,
        default: "user",
      },
      picture: {
        type: String,
        trim: true,
      },
      primaryLanguage: {
        type: String,
      },
      passwordResetToken: {
        type: String,
        minLength: 40,
        maxLength: 40,
      },
      friends: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      usersThatBlockedMe: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      usersThatIblocked: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      hasConfirmedEULA: {
        type: Boolean,
        default: false,
      },
      verification: {
        type: Boolean,
        default: false,
      },
      gameTimer: {
        type: String,
        default: "60",
      },
      voucherdata: {
        firstGiftCardReceived: {
          type: Boolean,
          default: false,
        },
        firstGiftVoucher: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "voucher",
        },
        secondGiftCardReceived: {
          type: Boolean,
          default: false,
        },
        secondGiftVoucher: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "voucher",
        },
        secondvoucherassignedDate: {
          type: Date,
        },
        firstvoucherassignedDate: {
          type: Date,
        },
      },
      geolocation: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
      lastLoginDevice: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
      // desiredCountry: {
      //   type: String,
      //   trim: true,
      // },
      desiredSound: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
      isGuest: {
        type: Boolean,
        default: false,
      },
      isGoogle: {
        type: Boolean,
        default: false,
      },
      isFacebook: {
        type: Boolean,
        default: false,
      },
      facebookId: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
      },
      googleId: {
        type: String,
        unique: true,
        trim: true,
        sparse: true,
      },
    },
    {
      timestamps: true,
    }
  );

const allUser = mongoose.model("allUser", alluserSchema);

module.exports = allUser;