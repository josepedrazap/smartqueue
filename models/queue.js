var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var queueSchema = new Schema(
  {
    id_user: {type: Schema.Types.ObjectId},
    id_next: {type: Schema.Types.ObjectId},
    arrive: {type: Date, default: Date.now},
    id_queue: {type: Schema.Types.ObjectId},
    status: {type: Boolean},
    top: {type: Boolean}
  }
);

queueSchema
.virtual('position')
.get(function () {
  return this.id_queue + ', ' + this.id_user + ', ' + this.arrive + ', ' + this.status;
});

//Export model
module.exports = mongoose.model('queue', queueSchema);
