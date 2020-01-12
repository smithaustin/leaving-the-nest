import pandas as pd
import json

class StatsCan:

    labour = (1899, 1919)
    commute_time = (1937, 1942)
    commute_mode = (1930, 1936)
    population = (0,1)


    def __init__(self, population_centre_csv):
        self.population_centres = pd.read_csv(population_centre_csv)

    # see above constants for idxs value 
    def get_pc_attribute(self, city, idxs):
        """ Returns the df of a specific attribute a Population Centre"""
        df = self.population_centres
        attrib_data = df[df['GEO_NAME'] == city].reset_index().iloc[idxs[0]:idxs[1]].reset_index()
        new_df = pd.DataFrame()
        new_df["category"] = attrib_data["DIM: Profile of Population Centres (2247)"]
        new_df["count"] = attrib_data["Dim: Sex (3): Member ID: [1]: Total - Sex"]
        new_df["rate"] = new_df["count"]/new_df["count"].sum()
        return new_df
    
    def get_geo_code_to_name(self):
        return self.population_centres[['GEO_CODE (POR)', 'GEO_NAME']].set_index('GEO_CODE (POR)').drop_duplicates()
    
    def trim_labour_data(self, labour_df):
        labour_df["category"] = labour_df["category"].str.extract(r'.*? (.*)')
        return labour_df
    
    def format_keys(self, categories):
        return {el["category"]: {"count": el["count"], "rate": el["rate"]} for el in categories}

    def get_city_json(self, city_name):
        defaults = json.load(open("static.json", 'r'))
        city = defaults[city_name]
        city["labour"] = self.format_keys(self.trim_labour_data(self.get_pc_attribute(city_name, self.labour)).to_dict('records'))
        city["commute_time"] = self.format_keys(self.get_pc_attribute(city_name, self.commute_time).to_dict('records'))
        city["commute_mode"] = self.format_keys(self.get_pc_attribute(city_name, self.commute_mode).to_dict('records'))
        return city
    
    def write_city_json(self, city_name, path):
        json.dump(self.get_city_json(city_name), open(path + '/' + city_name + ".json", 'w'))

if __name__ == "__main__":
    sc = StatsCan('/home/austin/Downloads/98-401-X2016048_eng_CSV(3)/98-401-X2016048_English_CSV_data.csv')
    sc.write_city_json("Vancouver", "/home/austin/Desktop/nwhacks/leaving-the-nest/sandbox")
    sc.write_city_json("Calgary", "/home/austin/Desktop/nwhacks/leaving-the-nest/sandbox")
    sc.write_city_json("Toronto", "/home/austin/Desktop/nwhacks/leaving-the-nest/sandbox")
    sc.write_city_json("Montréal", "/home/austin/Desktop/nwhacks/leaving-the-nest/sandbox")
