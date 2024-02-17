const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  //The one below doesnt work
  // PATIENT_ID: { type: String, required: true },
  // AGE: { type: Number, required: false },
  // SEX: { type: String, required: true },
  // ZIP: { type: Number, required: true },
  // LATEST_BMI: { type: Number, required: true },
  // 'LATEST WEIGHT': { type: Number, required: true },
  // png_filename: { type: String, required: true },
  // examId: { type: String, required: true },
  // 'ICU ADMIT': { type: String },
  // '# ICU ADMIT': { type: Number },
  // MORTALITY: { type: String },
  patientId: { type: String, required: true }, // Updated to match document
  age: { type: Number, required: true }, // Make required as per document; consider if this should be false based on your needs
  sex: { type: String, required: true }, // Matches
  zipCode: { type: String, required: true }, // Updated type to String to match document example, adjust as needed
  bmi: { type: Number, required: true }, // Updated to match document
  examId: { type: String, required: true }, // Matches
  keyFindings: { type: String, required: false }, 
  brixiaScores: { type: String, required: false }, 
  imageURL: { type: String, required: false },
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
  const exam = await this.findOneAndUpdate({ examId: examID }, updateData, { new: true });
  return exam;
};

// examSchema.methods.deleteExam(){
//   //Used to delete an individual exam
// }

examSchema.statics.deleteExam = async function(examID) {
  const delet = await this.findOneAndDelete({ examId: examID });
  return delet

};
const Exam = mongoose.model('Exam', examSchema);

module.exports = { Exam };

//comment for testing slack github integration
