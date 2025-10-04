const certificateServic = require("../services/certificateService");

const addCertification = async (req, res) => {
     const {name , issuer , issueDate , credentialId , credentialUrl , status , fileUplaodURL} = req.body;
     if(!name || !issuer || !issueDate || !status) {
          return res.status(400).json({error : "Name , Issuer and IssueDate are required"});
     }
     try {
          const newCertification = await certificateServic.addCertification(
               req.user._id,
               name,
               issuer,
               issueDate,
               credentialId,
               credentialUrl,
               status,
               fileUplaodURL
          );
          res.status(201).json({
               message : "Certification added successfully",
               certification : newCertification
          });
     } catch (error) {
          res.status(500).json({error : error.message});
     }
};

const getCertifications = async (req, res) => {
     try {
          const certifications = await certificateServic.getCertificate(req.user._id);
          res.status(200).json({certifications});
     } catch (error) {
          res.status(500).json({error : error.message});
     }
};

const updateCertification = async (req, res) => {
     const { id } = req.params;
     const updateData = req.body;
     try {
          const updateCertification = await certificateServic.updateCertification(
               req.user._id,
               id,
               updateData
          );
          res.status(200).json({
               message : "Certification updated successfully",
               certification : updateCertification
          });
     } catch (error) {
          res.status(500).json({error : error.message});
     }


};

const deleteCertification = async (req, res) => {
     const { id } = req.params;
     try {
          const deleteCert = await certificateServic.deleteCertification(
               req.user._id,
               id
          );
          res.status(200).json(deleteCert);
     } catch (error) {
          res.status(500).json({error : error.message});
     }
};


module.exports = {
     addCertification,
     getCertifications,
     updateCertification,
     deleteCertification,
};
