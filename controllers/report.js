const Report = require("../models/Report");

// Show upload form
module.exports.showUploadForm = (req, res) => {
  res.render("reports/upload");
};

// Handle file upload and create report job
module.exports.handleUpload = async (req, res) => {
  try {
    if (!req.file) {
      req.flash("error", "Please upload a PDF or image file!");
      return res.redirect("/ai-report");
    }

    // Create new report entry in DB
    const newReport = new Report({
      filePath: req.file.path,
      status: "pending",
      summaryText: "",
      videoUrl: "",
    });

    await newReport.save();

    // TODO: Trigger background AI processing (pdf → AI → TTS → video)

    // Redirect to result page
    res.redirect(`/ai-report/result/${newReport._id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong while uploading your report.");
    res.redirect("/ai-report");
  }
};

// Show result page (summary + video)
module.exports.showResult = async (req, res) => {
  try {
    const { jobId } = req.params;
    const report = await Report.findById(jobId);

    if (!report) {
      req.flash("error", "Report not found!");
      return res.redirect("/ai-report");
    }

    res.render("reports/show", { report });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong while fetching your report.");
    res.redirect("/ai-report");
  }
};
