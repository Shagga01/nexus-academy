import os
import json

# 📁 Directory to save generated kits
KIT_OUTPUT_DIR = "planner/literacy_kits"

def generate_dummy_kit(level, subject, topic, week):
    """Creates a sample literacy kit for given parameters"""
    return {
        "level": level,
        "subject": subject,
        "topic": topic,
        "week": week,
        "handwriting_task": f"Trace key words related to '{topic}'",
        "reading_task": f"Read a short story on '{topic}'",
        "writing_prompt": f"Write 3 sentences about '{topic}'",
        "verbal_task": f"Say 3 things you know about '{topic}'",
        "reflection": "How easy or hard was this kit?"
    }

def save_kit(level, subject, topic, week, kit_data):
    """Saves a single kit JSON to disk"""
    os.makedirs(KIT_OUTPUT_DIR, exist_ok=True)
    file_name = f"{level}_{subject}_{topic}_Week{week}.json".replace(" ", "_")
    path = os.path.join(KIT_OUTPUT_DIR, file_name)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(kit_data, f, indent=4)
    print(f"✅ Saved: {file_name}")

def batch_generate_kits(level, subject, topic):
    """Generates kits for weeks 1 to 12"""
    for week in range(1, 13):
        kit = generate_dummy_kit(level, subject, topic, week)
        save_kit(level, subject, topic, week, kit)

def main():
    print("\n📚 Literacy Kit Generator\n")
    try:
        level = input("Enter Level (e.g., Year 1): ").strip()
        subject = input("Enter Subject (e.g., Language Arts): ").strip()
        topic = input("Enter Topic (e.g., Phonics & Sounds): ").strip()

        if not level or not subject or not topic:
            print("❌ All fields are required. Please try again.")
            return

        print(f"\nGenerating kits for {level} > {subject} > {topic}...\n")
        batch_generate_kits(level, subject, topic)
        print("\n🎉 Done generating kits. Check planner/literacy_kits folder.\n")

    except KeyboardInterrupt:
        print("\n❌ Interrupted by user.")
    except Exception as e:
        print(f"❌ An error occurred: {e}")

if __name__ == "__main__":
    main()
