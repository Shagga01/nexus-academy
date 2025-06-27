import os
import json

# 📁 Path to generated lesson files
LESSON_DIR = "planner/generated_lessons"

def list_lesson_files():
    """List all .json lesson files in the directory."""
    if not os.path.exists(LESSON_DIR):
        print("❌ No generated lesson directory found.")
        return []

    return [f for f in os.listdir(LESSON_DIR) if f.endswith(".json")]

def load_lesson(file_name):
    """Load and return lesson JSON content."""
    path = os.path.join(LESSON_DIR, file_name)
    with open(path, 'r', encoding='utf-8') as file:
        return json.load(file)

def print_lesson_summary(data):
    """Print a simple summary of the lesson content."""
    print("\n📘 Lesson Overview:")
    print(f"• Learning Objectives: {data.get('learning_objectives', 'Not provided')}")
    print(f"• Weekly Breakdown: {data.get('weekly_breakdown', 'Not provided')}")
    print(f"• AI Prompts: {data.get('ai_prompts', 'Not provided')}")
    print(f"• Assessment Ideas: {data.get('assessment_ideas', 'Not provided')}")
    print(f"• VR Activities: {data.get('vr_activities', 'Not provided')}")
    print(f"• Video Links: {data.get('video_links', 'Not provided')}")

def main():
    print("🔎 Scanning for lesson files...\n")
    files = list_lesson_files()

    if not files:
        print("🚫 No lesson files found.")
        return

    print("📁 Found the following lesson files:\n")
    for idx, f in enumerate(files, 1):
        print(f"{idx}. {f}")

    choice = input("\nEnter the number of the file you want to preview: ")
    if not choice.isdigit() or int(choice) < 1 or int(choice) > len(files):
        print("❌ Invalid selection.")
        return

    selected_file = files[int(choice) - 1]
    lesson_data = load_lesson(selected_file)
    print_lesson_summary(lesson_data)

if __name__ == "__main__":
    main()
