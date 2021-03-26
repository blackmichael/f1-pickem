# F1 Pick'em

Simple scripts for scoring weekly Formula 1 Pick'em picks.

## Usage
```
python score.py results.csv picks.csv
```

`results.txt` should contain the names of each driver on individual lines, starting with P1.

`picks.csv` should look something like this:
|Timestamp         |Who are you                |Race               |First Place   |Second Place  |Third Place   |Fourth Place|Fifth Place     |Sixth Place    |Seventh Place   |Eighth Place|Ninth Place    |Tenth Place     |
|------------------|---------------------------|-------------------|--------------|--------------|--------------|------------|----------------|---------------|----------------|------------|---------------|----------------|
|3/25/2021 22:10:57|blackmichael                      |3/28/21: Bahrain GP|Max Verstappen|Sergio Perez  |Lewis Hamilton|Lando Norris|Daniel Ricciardo|Charles Leclerc|Valtteri Bottas |Pierre Gasly|Fernando Alonso|Esteban Ocon|


## Scoring

Similar to position scoring, if you correctly guess what position a driver comes in then you get 25 points. If you're off by 1 in either direction then you get 18 points, and so on. You pick the top 10 positions and then each driver is scored this way.

| Difference | Points |
| ---------- | ------ |
| 0 | 25 |
| 1 | 18 |
| 2 | 15 |
| 3 | 12 |
| 4 | 10 |
| 5 | 8 |
| 6 | 6 |
| 7 | 4 |
| 8 | 2 | 
| 9 | 1 |
| 9+ | 0 |
