const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  PATIENT_ID: { type: String, required: true },
  AGE: { type: Number, required: true},
  SEX: { type:String, required: true},
  ZIP: { type:Number, required: true},
  LATEST_BMI: { type:Number, required: true},
  'LATEST WEIGHT': { type:Number, required: true},
  png_filename: { type:String, required:true },
  exam_id: { type:String, required: true},
  'ICU ADMIT': { type:String}, 
  '# ICU ADMIT': {type:Number},
  MORTALITY: {type:String}
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = {Exam};
