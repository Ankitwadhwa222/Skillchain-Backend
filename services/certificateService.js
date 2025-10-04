
const User = require("../models/User");



const addCertification = async (_id , name , issuer , issueDate , credentialId , credentialUrl , status , fileUplaodURL) => {
     const user = await User.findById(_id);
     console.log(user);

     if(!user) throw new Error("User not found");

     const alreadyExists = user.certifications.some(
     cert => cert.credentialId === credentialId
     );
     if(alreadyExists) throw new Error("Certificate already exists");
     const newCertificate = {
          name,
          issuer,
          issueDate,
          credentialId,
          credentialUrl,
          status,
          fileUplaodURL
     };
     user.certifications.push(newCertificate);
     await user.save();
     return newCertificate;

};

const getCertificate = async (_id) => {
     const user  = await  User.findById(_id);
     if(!user) throw new Error("User not found");
     return user.certifications;
}

const updateCertification = async (userId, certId, updateData) => {
     const user = await User.findById(userId);
     if(!user) throw new Error("User not found");
     const cert = user.certifications.id(certId);
     if(!cert) throw new Error("Certification not found");
     Object.assign(cert, updateData);
     await user.save();
     return cert;
}

const deleteCertification = async (userId, certId) => {
     const user = await User.findById(userId);
     if (!user) throw new Error("User not found");
     const certIndex = user.certifications.findIndex(cert => cert._id.toString() === certId);
     if (certIndex === -1) throw new Error("Certification not found");
     user.certifications.splice(certIndex, 1);
     await user.save();
     return { message: "Certification deleted successfully" };
}



     
module.exports = {
     addCertification,
     getCertificate,
     updateCertification,
     deleteCertification
};