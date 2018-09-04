var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var queue_headerSchema = new Schema(
  {
    id_user: {type: Schema.Types.ObjectId},
    name: {type: String},
    status: {type: Boolean},
    date: {type: Date, default: Date.now},
  }
);
//Export model
module.exports = mongoose.model('queue_header', queue_headerSchema);
