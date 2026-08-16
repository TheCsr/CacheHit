from datetime import date, timedelta

# Spaced Repetition Intervals in days
INTERVALS = [3, 7, 14, 30, 60, 120]

def calculate_next_review(current_review_count: int) -> date:
    """Calculates the next review date based on the problem's review history."""
    index = min(current_review_count, len(INTERVALS) - 1)
    days_to_add = INTERVALS[index]
    return date.today() + timedelta(days=days_to_add)