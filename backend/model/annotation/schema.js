const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const annotationSchema = new Schema({
  account: {
    type: mongoose.Schema.ObjectId,
    ref: 'account',
    required: true
  },
  material: {
    type: mongoose.Schema.ObjectId,
    ref: 'Material',
    required: true
  },
  annotation: {
    type: String,
    required: true
  }
});

let annotations;

try {
  annotations = mongoose.model('Annotation');
} catch (error) {
  annotations = mongoose.model('Annotation', annotationSchema);
}

module.exports = annotations;
