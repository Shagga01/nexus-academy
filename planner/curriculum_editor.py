import json
import os

# 📁 Path to curriculum JSON
CURRICULUM_FILE = "curriculum/syllabus.config.json"

def load_curriculum():
    if not os.path.exists(CURRICULUM_FILE):
        print("❌ Curriculum file not found.")
        return {}
    with open(CURRICULUM_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_curriculum(data):
    with open(CURRICULUM_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)
    print("✅ Curriculum saved successfully.")

def list_subjects(level_data):
    print("\n📚 Subjects in this level:")
    for subject in level_data["subjects"]:
        print(f" - {subject}")

def add_subject(level_data):
    name = input("Enter new subject name: ").strip()
    if name in level_data["subjects"]:
        print("⚠️ Subject already exists.")
        return
    weeks = int(input("Enter number of weeks for this subject: "))
    vr = input("Enable VR (y/n)? ").lower() == "y"
    ai = input("Enable AI Adaptive (y/n)? ").lower() == "y"
    its = input("Enable ITS (y/n)? ").lower() == "y"
    topics = input("Enter topics separated by commas: ").split(",")

    level_data["subjects"][name] = {
        "curriculum_source": ["Nigerian"],
        "term_weeks": weeks,
        "topics": [t.strip() for t in topics],
        "vr_integration": vr,
        "ai_adaptive": ai,
        "ITS_enabled": its
    }
    print(f"✅ Added subject: {name}")

def edit_subject(level_data):
    name = input("Enter subject to edit: ").strip()
    if name not in level_data["subjects"]:
        print("❌ Subject not found.")
        return

    subj = level_data["subjects"][name]
    print(f"\nEditing '{name}':\nCurrent topics: {subj['topics']}")
    update_topics = input("Update topics (y/n)? ").lower()
    if update_topics == "y":
        topics = input("Enter new topics separated by commas: ").split(",")
        subj["topics"] = [t.strip() for t in topics]

    update_weeks = input("Update weeks (y/n)? ").lower()
    if update_weeks == "y":
        subj["term_weeks"] = int(input("New number of weeks: "))

    for flag in ["vr_integration", "ai_adaptive", "ITS_enabled"]:
        update = input(f"Toggle {flag} (currently {subj[flag]}) (y/n)? ").lower()
        if update == "y":
            subj[flag] = not subj[flag]

    print(f"✅ Updated subject: {name}")

def main():
    curriculum = load_curriculum()
    if not curriculum:
        return

    level = input("Enter level to edit (e.g. 'Year 1'): ").strip()
    if level not in curriculum["curriculum"]["levels"]:
        print("❌ Level not found.")
        return

    level_data = curriculum["curriculum"]["levels"][level]

    while True:
        print("\nWhat would you like to do?")
        print("1. List subjects")
        print("2. Add a subject")
        print("3. Edit a subject")
        print("4. Save & Exit")
        choice = input("Select (1-4): ").strip()

        if choice == "1":
            list_subjects(level_data)
        elif choice == "2":
            add_subject(level_data)
        elif choice == "3":
            edit_subject(level_data)
        elif choice == "4":
            save_curriculum(curriculum)
            break
        else:
            print("❌ Invalid choice. Try again.")

if __name__ == "__main__":
    main()
