const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  examId: {type: String, required: true},
  age: { type: Number, required: true },
  sex: { type: String, required: true },
  bmi: { type: Number, required: true },
  zipCode: { type: Number, required: true },
  imageURL: { type: String, required: true },
  keyFindings: { type: String, required: true },
  brixiaScores: { type: String, required: true }
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
    return deletedExam.safeFetch()
  }catch(err){
    console.log("Error when trying to delete exam: ", err)
    throw err
  }
}

examSchema.statics.createExam = async function (examData){
  console.log("Exam Model Create exam Method called.")

  try{
    const exam = new this({examData});
    await exam.save();
    return exam.safeFetch();

  }catch(err){
    console.log("Error when creating exam: ", err)
  }
}

const Exam = mongoose.model('Exam', examSchema);

module.exports = { Exam };
