const submitCompleteRegisterForm = async (values: any) => {
  try {
    let formData = new FormData();
    formData.append('image', values.image);
    formData.append('firstname', values.firstname);
    formData.append('lastname', values.lastname);
    formData.append('username', values.username);
    formData.append('bio', values.bio);
    formData.append('interests', values.interests);

    const res = await fetch("/api/auth/complete-register", {
      method: "POST",
      body: formData
    });

    const json = await res.json();

    if (json.status === "error") {
      // setErrors({ email: json.message });
    } else {
      // router.push("/dashboard");
    }
    console.log(json)
  } catch (error) {
    console.log(error);
  } finally {
    // setSubmitting(false);
  }
}

export default submitCompleteRegisterForm;