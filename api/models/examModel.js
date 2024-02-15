const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  PATIENT_ID: { type: String, required: true },
  AGE: { type: Number, required: true },
  SEX: { type: String, required: true },
  ZIP: { type: Number, required: true },
  LATEST_BMI: { type: Number, required: true },
  'LATEST WEIGHT': { type: Number, required: true },
  png_filename: { type: String, required: true },
  exam_id: { type: String, required: true },
  'ICU ADMIT': { type: String },
  '# ICU ADMIT': { type: Number },
  MORTALITY: { type: String },
});

// CHANGES

// examSchema.methods.createExam(){
//   //Used to create an exam
// }
examSchema.statics.createExam = async function(examData) {
  const exam = new this(examData);
  await exam.save();
  return exam;
};
// examSchema.methods.updateExam(examID){
//   //Used to update an individual exam
// }
examSchema.statics.updateExam = async function(examID, updateData) {
  const exam = await this.findOneAndUpdate({ exam_id: examID }, updateData, { new: true });
  return exam;
};

// examSchema.methods.deleteExam(){
//   //Used to delete an individual exam
// }

examSchema.statics.deleteExam = async function(examID) {
  await this.findOneAndDelete({ exam_id: examID });
};
const Exam = mongoose.model('Exam', examSchema);

module.exports = { Exam };

//comment for testing slack github integration
