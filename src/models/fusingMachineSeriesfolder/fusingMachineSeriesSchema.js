import mongoose from 'mongoose';
import FusingMachineSeriesSubModelSchema from './fusingMachineSeriesSubModelSchema.js';

const FusingMachineSeriesSchema = new mongoose.Schema({
    model: { type: String, required: true, default: '*' },
    technicalDescription: { type: String, required: true, default: '*' },
    detailedTechnicalDescription: { type: String, required: true, default: '*' },
    tableSize: { type: String, default: '*' },
    cuttingHeight: { type: String, default: '*' },
    armSize: { type: String, default: '*' },
    knifeSize: { type: String, default: '*' },
    voltage: { type: String, default: '*' },
    netWeight: { type: String, default: '*' },
    packingSize: { type: String, default: '*' },
    powerSupply: { type: String, default: '*' },
    ratedOutput: { type: String, default: '*' },
    temperature: { type: String, default: '*' },
    pressure: { type: String, default: '*' },
    beltSpeed: { type: String, default: '*' },
    heatingTime: { type: String, default: '*' },
    fusingWidth: { type: String, default: '*' },
    dimension: { type: String, default: '*' },
    cuttingLength: { type: String, default: '*' },
    maximumCutting: { type: String, default: '*' },
    cuttingSpeed: { type: String, default: '*' },
    maximumBladeTemperature: { type: String, default: '*' },
    voltageV: { type: String, default: '*' },
    frequencyHz: { type: String, default: '*' },
    powerKw: { type: String, default: '*' },
    packageSize: { type: String, default: '*' },
    recommendedAirPressure: { type: String, default: '*' },
    needleType: { type: String, default: '*' },
    threadNo: { type: String, default: '*' },
    stitchLength: { type: String, default: '*' },
    stitchWidth: { type: String, default: '*' },
    needleBarStroke: { type: String, default: '*' },
    speedInRPM: { type: String, default: '*' },
    oil: { type: String, default: '*' },
    image: { type: String, default: '*' },
    series: { type: mongoose.Schema.Types.ObjectId, ref: 'Series', required: true },
    subModels: { type: [FusingMachineSeriesSubModelSchema], default: [] }
});

const FusingMachineSeriesModel = mongoose.models.FusingMachineSeries || mongoose.model('Fusingmachine', FusingMachineSeriesSchema);
export default FusingMachineSeriesModel;
