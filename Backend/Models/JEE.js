const jeeResultSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    imagePath: { type: String, required: true },
    college: { type: String },
    totalPercentile: { type: Number, min: 0, max: 100 },
    AIR: { type: Number },
    physicsPercentile: { type: Number, min: 0, max: 100 },
    chemistryPercentile: { type: Number, min: 0, max: 100 },
    mathematicsPercentile: { type: Number, min: 0, max: 100 },
    Tag: { type: String }
}, { timestamps: true });

const JEEResult = mongoose.model('JEEResult', jeeResultSchema);
export default JEEResult;
