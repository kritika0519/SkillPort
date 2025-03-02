from flask import Flask, render_template, request, send_file
from weasyprint import HTML
import pickle
import pandas as pd

app = Flask(__name__)

# Load the trained model
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

# Load projects from CSV
def load_csv_projects():
    try:
        df = pd.read_csv("D:\\Documents\\my-app\\Project_Repo\\projects.csv")

        # Ensure required columns exist
        if not {"Project Name", "Description", "Skills Used", "GitHUB Link"}.issubset(df.columns):
            print("Error: Missing columns in projects.csv")
            return []

        # Fill NaN values with empty strings
        df = df.fillna("")

        csv_projects = list(zip(df["Project Name"], df["Description"], df["Skills Used"], df["GitHUB Link"]))
        print(f"CSV Projects Loaded: {csv_projects}")  # Debugging
        return csv_projects
    except Exception as e:
        print(f"Error loading CSV: {e}")
        return []

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        # Fetch form data
        skills_input = request.form.get("skills", "").split(",")  # Assume comma-separated input

        # Initialize tech stack dictionary
        tech_stack_dict = {
            "Integrated Development Environments": ["Workbench", "VS Code", "Jupyter", "MS 365 Tools"],
            "Soft Skills": [
                "Team Player with Leadership Skills", "Adaptability to Diverse Environments",
                "Collaboration with People from Different Cultures", "Effective Communicator",
                "Client-First Approach", "Positive Attitude with Due Caution"
            ]
        }

        # Process and categorize skills
        for skill in skills_input:
            skill = skill.strip()
            if skill:  # Avoid empty strings
                category = model.predict([skill])[0]  # Predict category for each skill
                if category in tech_stack_dict:
                    tech_stack_dict[category].append(skill)
                else:
                    tech_stack_dict[category] = [skill]

        # Fetch projects from the form
        form_projects = list(zip(
            request.form.getlist("project_name[]"), 
            request.form.getlist("project_desc[]"), 
            request.form.getlist("project_skills[]"),
            request.form.getlist("project_github[]")
        ))

        # Load projects from CSV
        csv_projects = load_csv_projects()

        # Merge form projects and CSV projects
        all_projects = form_projects + csv_projects
        print(f"Final Merged Projects: {all_projects}")  # Debugging

        data = {
            "longterm_goal": "In the long run, I foresee myself as a Software Engineering Specialist doing disruptive "
                             "innovations for businesses. Understanding business problems and coming up with innovative "
                             "solutions fascinates me a lot. Currently, I am eager to start my professional journey with "
                             "a team of highly innovative professionals like you.\n\n"
                             "As of now, I have thoroughly learned algorithm design, data structures, machine learning, "
                             "and deep learning complemented with hands-on experience in Sequence Modelling. I prefer "
                             "keeping myself most updated with the latest tools and technologies to augment my programming "
                             "skills. I thrive in collaborative environments and strive hard to meet deadlines, leading to "
                             "timely completion of my projects.",
            "name": request.form.get("name"),
            "email": request.form.get("email"),
            "phone": request.form.get("phone"),
            "linkedin": request.form.get("linkedin"),
            "github": request.form.get("github"),
            "leetcode": request.form.get("leetcode"),
            "education": list(zip(
                request.form.getlist("education[]"), 
                request.form.getlist("institution[]"), 
                request.form.getlist("grad_year[]"), 
                request.form.getlist("cgpa[]")
            )),
            "projects": all_projects,  # Use merged projects list
            "experience": list(zip(
                request.form.getlist("experience_org[]"), 
                request.form.getlist("experience_desc[]"), 
                request.form.getlist("experience_year[]")
            )),
            "tech_stack": tech_stack_dict,  # Store categorized skills
            "extra_curricular": request.form.get("extra_curricular"),
        }

        # Generate PDF
        html = render_template("res_temp.html", data=data)
        pdf_path = "resume.pdf"
        HTML(string=html).write_pdf(pdf_path)

        return send_file(pdf_path, as_attachment=True)

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
 