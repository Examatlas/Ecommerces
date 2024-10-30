import * as Yup from "yup";

export const examFormValidation = Yup.object().shape({
  examName: Yup.string()
    .required("Exam name is required")
    .min(3, "Exam name must be at least 3 characters long"),
  image: Yup.mixed()
    .required("Image is required")
    .test("fileSize", "Image size too large", (value) =>
      value ? value.size <= 1024 * 1024 : true // 1MB limit
    )
    .test(
      "fileFormat",
      "Unsupported format",
      (value) =>
        value ? ["image/jpeg", "image/png", "image/jpg"].includes(value.type) : true
    ),
});
