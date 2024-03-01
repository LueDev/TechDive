const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  examId: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  bmi: { type: Number, default: 7 },
  zipCode: { type: Number, required: true },
  imageURL: { type: String, required: true },
  keyFindings: { type: String, required: true },
  brixiaScores: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  status: { type: String, default: 'active' },
});
examSchema.methods.safeFetch = function () {
  const examObject = this.toObject();
  delete examObject._id;
  delete examObject.__v;
  return examObject;
};

examSchema.pre('save', function (next) {
  //conversions for the BMI Formula : BMI= weight (kg) / height(m)^2
  console.log('RIGHT BEFORE THE SAVE FUNCTION. BMI PRIOR TO OP: ', this.bmi);
  const kg = parseFloat(this.weight) * 0.45359237;
  const meters = parseFloat(this.height) * 0.0254;

  this.bmi = ((kg * kg) / (meters * kg)).toFixed(2);
  console.log('RIGHT BEFORE THE SAVE FUNCTION. BMI AFTER OP: ', this.bmi);

  next();
});

examSchema.statics.findByPatientId = async function (patientId) {
  console.log('Exam Model Find By Patient Id Class Method called.');
  try {
    const patient = await this.find({ patientId: patientId });
    return patient;
  } catch (err) {
    console.log('Error when finding patient by ID ', err);
    throw err;
  }
};

examSchema.statics.findExam = async function (documentId) {
  console.log('Exam Model Find By Patient Id Class Method called.');

  try {
    const exam = await this.aggregate([
      {
        $match: {
          _id: documentId,
        },
      },
    ]);
    return exam[0];
  } catch (err) {
    console.log('Error when finding exam by ID ', err);
    throw err;
  }
};

examSchema.statics.updateExam = async function (updatedExam) {
  console.log('Exam Model Create Exam Class Method called.');
  try {
    const exam = await this.findOneAndUpdate(
      { _id: updatedExam._id },
      { $set: updatedExam },
      { new: true }, //this option returns the updated document
    );
    return exam;
  } catch (err) {
    console.log('Error when updating exam: ', err);
    throw err;
  }
};
examSchema.statics.deleteExam = async function (examId) {
  console.log('Exam Model Delete Exam Instance Method called');
  try {
    const deletedExam = await this.deleteOne({ _id: examId });
    return true
  } catch (err) {
    console.log('EXAM MODEL - Error when trying to delete exam: ', err);
    throw err;
  }
};
examSchema.statics.createExam = async function (examData) {
  console.log('Exam Model Create exam Method called.');
  try {
    const exam = new this({ ...examData });
    console.log(
      'CALLED FROM MODEL CREATE EXAM FUNC: \n',
      exam,
      'DATA: ',
      examData,
    );
    await exam.save();
    return exam.safeFetch();
  } catch (err) {
    console.log('Error when creating exam: ', err);
  }
};
const Exam = mongoose.model('Exam', examSchema);
module.exports = { Exam };
