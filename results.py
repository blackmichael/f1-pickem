import requests
from bs4 import BeautifulSoup


class YearOption():
    def __init__(self, year, href):
        self.year = year
        self.href = href

    def __str__(self):
        return f"{self.year}"


class RaceOption():
    def __init__(self, year, race, href):
        self.year = year
        self.race = race
        self.href = href
    
    def __str__(self):
        return f"{self.year} {self.race}"


class RaceComponentOption():
    def __init__(self, year, race, component, href):
        self.year = year
        self.race = race
        self.component = component
        self.href = href
    
    def __str__(self):
        return f"{self.year} {self.race} {self.component}"


def get_webpage(path: str):
    base_url = "https://www.formula1.com"
    resp = requests.get(base_url + path)
    if resp.status_code != 200:
        raise Exception(f"Error grabbing content from {base_url}: status_code={resp.status_code}")
    
    soup = BeautifulSoup(resp.content, "html.parser")
    return soup


def choose(title: str, options: list):
    print(title)
    for idx, option in enumerate(options):
        print(f"{idx}: {option}")
    
    selection = None
    while selection is None:
        selection_str = input(f"Please select an option (0-{len(options)-1}): ")
        
        # validate format
        try:
            selection = int(selection_str)
        except:
            print("Invalid selection.\n")
            selection = None
        
        if selection is not None and (selection < 0 or selection >= len(options)):
            print("Invalid selection.\n")
            selection = None

    # buffer
    print()

    return options[selection]


def get_year_options():
    main = get_webpage("/en/results.html")
    year_list = main.find("ul", {"class": "resultsarchive-filter ResultFilterScrollable"})
    year_items = year_list.find_all("a")
    years = [ YearOption(year.attrs['data-value'], year.attrs['href']) for year in year_items ]

    return years


def get_race_options(year: YearOption):
    races_page = get_webpage(year.href)
    races_table = races_page.find("table", {"class": "resultsarchive-table"})
    races_table_body = races_table.find("tbody")
    race_rows = races_table_body.find_all("tr")
    race_links = [ race_row.find("a") for race_row in race_rows ]
    races = [ RaceOption(year.year, race.text.strip(), race.attrs["href"]) for race in race_links ]

    return races


def get_race_component_options(race: RaceOption):
    race_page = get_webpage(race.href)
    race_component_list = race_page.find("ul", {"class": "resultsarchive-side-nav"})
    race_component_items = race_component_list.find_all("a")
    race_components = []
    for component in race_component_items:
        race_components.append(RaceComponentOption(race.year, race.race, component.text.strip(), component.attrs["href"]))
    
    return race_components


def get_results(race_component: RaceComponentOption):
    results_page = get_webpage(race_component.href)
    results_table = results_page.find("table", {"class": "resultsarchive-table"})
    results_table_body = results_table.find("tbody")
    results_rows = results_table_body.find_all("tr")

    results = []
    for row in results_rows:
        # get the third column
        name_col = row.find_all("td")[3]
        # name components are split into spans for media rendering
        name_components = name_col.find_all("span")[:2]
        name = f"{name_components[0].text} {name_components[1].text}"
        # hack to resolve char encoding issues with names like Kimi's
        results.append(name.encode('utf-8').decode('utf-8'))
    
    return results


def print_results(results: list[str]):
    print("Results:")
    for idx, driver in enumerate(results):
        print(f"P{idx+1}: {driver}")


def report_results(results: list[str]):
    with open("results.txt", "w") as f:
        for driver in results:
            f.write(f"{driver}\n")

    print(f"\nSaved {race_component} results to results.txt")


if __name__ == "__main__":
    year_options = get_year_options()
    year = choose("Choose a race year", year_options[:5]) # only last 5

    race_options = get_race_options(year)
    race = choose("Choose a race location", race_options)

    race_components = get_race_component_options(race)
    race_component = choose("Choose a result", race_components)

    results = get_results(race_component)
    print_results(results)
    report_results(results)