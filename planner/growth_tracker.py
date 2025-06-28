import os
import json

WRITING_BANK = "planner/student_writing_bank.json"
GROWTH_REPORTS_DIR = "planner/growth_reports"

def load_student_bank():
    if not os.path.exists(WRITING_BANK):
        print("📂 No writing bank found. Creating new.")
        return []
    with open(WRITING_BANK, "r", encoding="utf-8") as f:
        return json.load(f)

def analyze_growth(data):
    reports = []
    for student in data:
        entry_count = len(student.get("entries", []))
        vocab_size = sum(len(e.get("text", "").split()) for e in student.get("entries", []))
        avg_words = vocab_size / entry_count if entry_count else 0
        reports.append({
            "name": student.get("name", "Unknown"),
            "total_entries": entry_count,
            "total_words": vocab_size,
            "average_words_per_entry": round(avg_words, 2)
        })
    return reports

def save_reports(reports):
    os.makedirs(GROWTH_REPORTS_DIR, exist_ok=True)
    path = os.path.join(GROWTH_REPORTS_DIR, "summary.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(reports, f, indent=4)
    print(f"✅ Saved growth summary to {path}")

def main():
    print("\n📊 Growth Tracker Running...\n")
    student_data = load_student_bank()
    summary = analyze_growth(student_data)
    save_reports(summary)
    print("\n🎉 Done! Growth summary generated.\n")

if __name__ == "__main__":
    main()
