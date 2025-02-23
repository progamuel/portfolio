import './CreatePage.css';

const CreatePage = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = document.getElementById("create-form") as HTMLFormElement;

    try {
      const response = await fetch('/api/v1/employer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subdomain: form.subdomain.value,
          password: form.password.value
        })
      });
      form.reset();

      console.log(response);
      alert(response.ok ? "Employer created successfully!" : "Failed to create employer");
    } catch (error) {
      console.error(error);
      alert("Error submitting data.");
    }
  };

  return (
    <main className="flex-col CreatePage">
      <h1>Create new employer</h1>
      <form id="create-form" onSubmit={handleSubmit} className="flex-col">
        <input type="text" name="subdomain" placeholder="Subdomain" required/>
        <input type="password" name="password" placeholder="Password" required/>
        <button type="submit">Create</button>
      </form>
    </main>
  );
};

export {CreatePage};