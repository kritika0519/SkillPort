# type: ignore
from flask import Flask, request, jsonify, send_file
import os

app = Flask(__name__)

@app.route('/generate-resume', methods=['POST'])  # ✅ Ensure methods=['POST']
def generate_resume():
    try:
        user_data = request.get_json()
        user_id = user_data.get("user_id")

        # Example: Resume file path
        resume_path = f"resumes/{user_id}_resume.pdf"

        if not os.path.exists(resume_path):
            return jsonify({"error": "Resume not found"}), 404

        return send_file(resume_path, as_attachment=True)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8070, debug=True)  # ✅ Ensure correct port
