import { Schema, mongoose } from 'mongoose';

const patientSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  age: {
    type: Number,
  },
  image: {
    type: String,
  },

  mobile: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  status: {
    type: Boolean,
    default: true,
  },
  name: {
    first: {
      type: String,
    },
    last: {
      type: String,
    },
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },

  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
  },
  medicalHistory: [
    {
      date: {
        type: Date,
      },
      diagnosis: {
        type: String,
      },
      medications: [
        {
          name: {
            type: String,
          },
          dosage: {
            type: String,
          },
          frequency: {
            type: String,
          },
          startDate: {
            type: Date,
          },
          endDate: {
            type: Date,
          },
        },
      ],
      procedures: [
        {
          name: {
            type: String,
          },
          result: {
            type: String,
          },
          date: {
            type: Date,
          },
        },
      ],
      notes: {
        type: String,
      },
    },
  ],
});


const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);
export default Patient;
