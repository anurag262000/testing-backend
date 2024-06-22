import CuttingMachineSeriesModel from '../models/cuttingMachineSeriesfolder/cuttingMachineSeriesSchema.js';
import multer from 'multer';
import updateSeriesWithNewModels from '../updateSeriesWithNewModels.js';
import cleanupSeries from '../cleanupSeries.js';
import path from 'path'; // Make sure to import path if not already done

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

// Create CuttingMachineSeries Model
export const createCuttingMachineSeriesModel = async (req, res) => {
    try {
        let newModelData;

        if (req.is('multipart/form-data')) {
            newModelData = {
                model: req.body.model,
                technicalDescription: req.body.technicalDescription,
                detailedTechnicalDescription: req.body.detailedTechnicalDescription,
                tableSize: req.body.tableSize,
                cuttingHeight: req.body.cuttingHeight,
                armSize: req.body.armSize,
                knifeSize: req.body.knifeSize,
                voltage: req.body.voltage,
                netWeight: req.body.netWeight,
                packingSize: req.body.packingSize,
                powerSupply: req.body.powerSupply,
                ratedOutput: req.body.ratedOutput,
                temperature: req.body.temperature,
                pressure: req.body.pressure,
                beltSpeed: req.body.beltSpeed,
                heatingTime: req.body.heatingTime,
                fusingWidth: req.body.fusingWidth,
                dimension: req.body.dimension,
                cuttingLength: req.body.cuttingLength,
                maximumCutting: req.body.maximumCutting,
                cuttingSpeed: req.body.cuttingSpeed,
                maximumBladeTemperature: req.body.maximumBladeTemperature,
                voltageV: req.body.voltageV,
                frequencyHz: req.body.frequencyHz,
                powerKw: req.body.powerKw,
                packageSize: req.body.packageSize,
                recommendedAirPressure: req.body.recommendedAirPressure,
                needleType: req.body.needleType,
                threadNo: req.body.threadNo,
                stitchLength: req.body.stitchLength,
                stitchWidth: req.body.stitchWidth,
                needleBarStroke: req.body.needleBarStroke,
                isSuitableForLightMaterial: req.body.isSuitableForLightMaterial === 'true',
                isSuitableForMediumMaterial: req.body.isSuitableForMediumMaterial === 'true',
                isSuitableForHeavyMaterial: req.body.isSuitableForHeavyMaterial === 'true',
                speedInRPM: parseFloat(req.body.speedInRPM),
                oil: req.body.oil === 'true',
                image: req.file ? req.file.path : req.body.image,
                series: req.body.series,
                subModels: JSON.parse(req.body.subModels || '[]'),
            };
        } else {
            newModelData = req.body;
        }

        const newModel = new CuttingMachineSeriesModel(newModelData);
        await newModel.save();
        
        // Run the series update function
        await updateSeriesWithNewModels();
        await cleanupSeries();

        res.status(201).json({ message: 'Model created successfully', model: newModel });
    } catch (error) {
        console.error('Error creating model:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all CuttingMachineSeries Models
export const getCuttingMachineSeriesModels = async (req, res) => {
    try {
        const models = await CuttingMachineSeriesModel.find();
        res.status(200).json(models);
    } catch (error) {
        console.error('Error fetching models:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get CuttingMachineSeries Model by ID
export const getCuttingMachineSeriesModelById = async (req, res) => {
    try {
        const model = await CuttingMachineSeriesModel.findById(req.params.id);
        if (!model) {
            return res.status(404).json({ message: 'Model not found' });
        }
        res.status(200).json(model);
    } catch (error) {
        console.error('Error fetching model by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update CuttingMachineSeries Model
export const updateCuttingMachineSeriesModel = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if an image file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }

        const updatedData = { image: req.file.path };

        const model = await CuttingMachineSeriesModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!model) {
            return res.status(404).json({ message: 'Model not found' });
        }

        // Run the series update function
        await updateSeriesWithNewModels();

        res.status(200).json({ message: 'Model updated successfully', model });
    } catch (error) {
        console.error('Error updating model:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete CuttingMachineSeries Model
export const deleteCuttingMachineSeriesModel = async (req, res) => {
    try {
        const model = await CuttingMachineSeriesModel.findByIdAndDelete(req.params.id);
        if (!model) {
            return res.status(404).json({ message: 'Model not found' });
        }

        // Run the series update function
        await updateSeriesWithNewModels();

        // Clean up series references
        await cleanupSeries();

        res.status(200).json({ message: 'Model deleted successfully' });
    } catch (error) {
        console.error('Error deleting model:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get CuttingMachineSeries Model Schema Fields
export const getCuttingMachineSeriesModelSchemaFields = async (req, res) => {
    try {
        const schemaFields = Object.keys(CuttingMachineSeriesModel.schema.paths).reduce((fields, path) => {
            fields[path] = CuttingMachineSeriesModel.schema.paths[path].instance;
            return fields;
        }, {});
        res.status(200).json(schemaFields);
    } catch (error) {
        console.error('Error fetching schema fields:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { upload };
