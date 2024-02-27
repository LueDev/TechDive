const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  patientId: { type: String, required: true, match: [/^COVID-[0-9]*$/i, 'patientId must follow the COVID-<numbers> format and is case-insensitive'] },
  examId: {type: String, required: true, unique: true, match: [/^EXAM-[0-9]*$/i, 'examId must follow the EXAM-<numbers> format and is case-insensitive']},
  age: { type: Number, required: true, min: [1, 'Age must be strictly positive'], max: [122, 'Age cannot exceed 122'] },
  sex: { type: String, required: true, match: [/^(M|F|X)$/, 'Sex must be M,F, or X'] },
  bmi: { type: Number, required: true, min: [1, 'bmi must be strictly positive'], max: [100, 'bmi cannot exceed 100' ] },
  zipCode: { type: Number, required: true, match: [/^[0-9]{5}$/, 'Zipcode must be exactly 5 digits long'] },
  imageURL: { type: String, required: true },
  keyFindings: { type: String, required: true },
  brixiaScores: { type: String, required: true, match: [ /^([0-9],[0-9])(,[0-9],[0-9]){1,2}$/, 'Brixia scores must be at least 2 numbers, at most 6, and in range 0-6 (seperated by commas)'] },
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()},
  status: {type: String, default: "active"}
});
examSchema.methods.safeFetch = function(){
  const examObject = this.toObject();
  delete examObject._id
  delete examObject.__v
  return examObject
}
examSchema.statics.findByPatientId = async function(patientId){
  console.log("Exam Model Find By Patient Id Class Method called.")
  try{
    const patient = await this.find({patientId: patientId})
    return patient
  }catch(err){
    console.log("Error when finding patient by ID ", err)
    throw err
  }
}

examSchema.statics.updateExam = async function(updatedExam){
  console.log("Exam Model Create Exam Class Method called.")
  try{
    const exam = await this.findOneAndUpdate(
      {_id: updatedExam._id},
      {$set: updatedExam},
      {new: true} //this option returns the updated document
    )
    return exam
  }catch(err){
    console.log("Error when updating exam: ", err)
    throw err
  }
}
examSchema.statics.deleteExam = async function (examData) {
  console.log("Exam Model Delete Exam Instance Method called")
  try{
    const deletedExam = await this.deleteOne({_id: examData._id})
    return deletedExam
  }catch(err){
    console.log("Error when trying to delete exam: ", err)
    throw err
  }
}
examSchema.statics.createExam = async function (examData){
  console.log("Exam Model Create exam Method called.")
  try{
    const exam = new this({...examData});
    await exam.save();
    return exam.safeFetch();
  }catch(err){
    console.log("Error when creating exam: ", err)
  }
}
const Exam = mongoose.model('Exam', examSchema);
module.exports = { Exam };