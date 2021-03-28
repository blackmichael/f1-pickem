import csv
import sys


class Picks():
    def __init__(self, name: str, picks: list[str]):
        self.name = name
        self.drivers = picks

    def get_placement(self, driver: str):
        try:
            return self.drivers.index(driver)
        except:
            return -1

    def __str__(self):
        output = f'{self.name} picks:\n'
        for i, driver in enumerate(self.drivers):
            output = output + f'P{i + 1}: {driver}\n'
        
        return output


class Score():
    def __init__(self, name: str, score: int):
        self.name = name
        self.score = score

    def __str__(self):
        return f'{self.name}: {self.score}'


def safe_index(l: list, element):
    try:
        return l.index(element)
    except:
        return -1


def print_scores(results: list[str], all_picks: list[Picks]):
    for picks in all_picks:
        print(score(results, picks))


def score(results: list[str], picks: Picks) -> Score:
    score = 0
    for picked_placement, driver in enumerate(picks.drivers):
        place = safe_index(results, driver)
        points = get_points(picked_placement, place)
        # print(f"{picks.name} picked {driver} for P{picked_placement + 1}, actual was P{place + 1} ({points} points)")
        score = score + points
    
    return Score(picks.name, score)


def get_points(picked_place: int, actual_place: int) -> int:
    scoring = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1]

    if actual_place == -1:
        return 0

    if picked_place == -1:
        return 0
    
    diff = abs(picked_place - actual_place)

    if diff > 9:
        return 0
    
    return scoring[diff]


def load_picks(filename) -> list[Picks]:
    with open(filename) as f:
        all_picks = []
        reader = csv.reader(f)

        # skip header
        reader.__next__()

        for line in reader:
            name = line[1]
            picks = line[3:]
            all_picks.append(Picks(name=name, picks=picks))

        return all_picks


def load_results(filename) -> list[str]:
    with open(filename) as f:
        drivers = []
        for line in f:
            drivers.append(line.strip())
        
        return drivers


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Invalid arguments.\n\nusage: python score.py results.csv picks.csv")
        sys.exit(1)

    results = load_results(sys.argv[1])
    all_picks = load_picks(sys.argv[2])

    print_scores(results, all_picks)
