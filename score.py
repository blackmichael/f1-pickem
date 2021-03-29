import csv
import sys


class Picks():
    def __init__(self, name: str, picks: list[str]):
        self.name = name
        self.drivers = picks

    def __str__(self):
        output = f'{self.name} picks:\n'
        for i, driver in enumerate(self.drivers):
            output = output + f'P{i + 1}: {driver}\n'
        
        return output


class PickResult():
    def __init__(self, driver: str, picked_place: int, actual_place: int):
        self.driver = driver
        self.picked_place = picked_place
        self.actual_place = actual_place
    
    def points(self) -> int:
        scoring = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1]

        if self.actual_place == -1:
            return 0

        diff = abs(self.picked_place - self.actual_place)
        if diff > 9:
            return 0
        
        return scoring[diff]


class Score():
    def __init__(self, name: str, pick_results: list[PickResult]):
        self.name = name
        self.pick_results = pick_results

    def calculate(self):
        score = 0
        for pick_result in self.pick_results:
            score = score + pick_result.points()
        
        return score
    
    def csv_report(self):
        output = []
        output.append([self.name,"","",self.calculate()])
        for pick_result in self.pick_results:
            output.append([pick_result.driver, pick_result.picked_place+1, pick_result.actual_place+1, pick_result.points()])

        # buffer line
        output.append([])
        return output

    def __str__(self):
        return f'{self.name}: {self.calculate()}'


def safe_index(l: list, element):
    try:
        return l.index(element)
    except:
        return -1


def report_scores(output: str, results: list[str], all_picks: list[Picks]):
    scores = []
    for picks in all_picks:
        scores.append(score(results, picks))
    
    with open(output, 'w') as f:
        writer = csv.writer(f)
        writer.writerow(["Name / Driver", "Picked Place", "Actual Place", "Points"])
        for s in scores:
            writer.writerows(s.csv_report())
    
    print(f"Report saved to {output}")


def print_scores(results: list[str], all_picks: list[Picks]):
    for picks in all_picks:
        print(score(results, picks))


def score(results: list[str], picks: Picks) -> Score:
    pick_results = []
    for picked_place, driver in enumerate(picks.drivers):
        actual_place = safe_index(results, driver)
        pick_results.append(PickResult(driver, picked_place, actual_place))
    
    return Score(picks.name, pick_results)


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
    report_scores("scores.csv", results, all_picks)
