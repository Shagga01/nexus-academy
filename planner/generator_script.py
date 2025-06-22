import json
import os
import openai

# 🔐 Replace with your actual OpenAI API key
openai.api_key = "OPENAI_API_KEY_ENV"

# 📍 File Paths
SYLLABUS_PATH = "curriculum/syllabus.config.json"
OUTPUT_DIR = "planner/generated_lessons"

# 🧠 Prompt Template
PROMPT_TEMPLATE = """
You're an intelligent curriculum developer creating lesson plans for virtual schools.

Subject: {subject}
Topic: {topic}
Level: {level}
Term Weeks: {weeks}
VR/AR Integration: {vr}
Adaptive AI Support: {adaptive}
ITS Enabled: {its}

Generate a full lesson plan in JSON with:
- weekly breakdowns
- learning objectives
- AI prompts
- assessment ideas
- VR activities
- links to suggested curated video ideas (YouTube)
"""

def ensure_output_dir():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

def load_curriculum():
    with open(SYLLABUS_PATH, 'r', encoding='utf-8') as file:
        return json.load(file)['curriculum']['levels']

def generate_prompt(subject, topic, level, weeks, vr, adaptive, its):
    return PROMPT_TEMPLATE.format(
        subject=subject,
        topic=topic,
        level=level,
        weeks=weeks,
        vr=vr,
        adaptive=adaptive,
        its=its
    )

def call_openai(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5,
        max_tokens=1500
    )
    return response['choices'][0]['message']['content']

def generate_lessons():
    ensure_output_dir()
    levels = load_curriculum()

    for level, level_data in levels.items():
        for subject, details in level_data['subjects'].items():
            weeks = details.get('term_weeks', 12)
            vr = details.get('vr_integration', False)
            adaptive = details.get('ai_adaptive', False)
            its = details.get('ITS_enabled', False)

            for topic in details['topics']:
                prompt = generate_prompt(subject, topic, level, weeks, vr, adaptive, its)
                print(f"🔍 Generating for: {level} > {subject} > {topic}")
                content = call_openai(prompt)

                # Save output
                filename = f"{level}_{subject}_{topic}.json".replace(" ", "_")
                with open(os.path.join(OUTPUT_DIR, filename), 'w', encoding='utf-8') as f:
                    f.write(content)

if __name__ == "__main__":
    generate_lessons()
