import pandas as pd

class StatsCan:

    def __init__(self, population_centre_csv):
        self.population_centres = pd.read_csv(population_centre_csv)

    # use for 
    def get_pc_attribute(self, df, city, idx_min, idx_max, attrib_name):
        """ Returns the df of a specific attribute a Population Centre"""
        attrib_data = df[df['GEO_NAME'] == city].reset_index().iloc[idx_min:idx_max].reset_index()
        new_df = pd.DataFrame()
        new_df[attrib_name] = attrib_data["DIM: Profile of Population Centres (2247)"]
        new_df[attrib_name + "_count"] = attrib_data["Dim: Sex (3): Member ID: [1]: Total - Sex"]
        new_df[attrib_name + "_rate"] = new_df[attrib_name + "_count"]/new_df[attrib_name + "_count"].sum()
        return new_df
    
    def get_geo_code_to_name(self):
        return self.population_centres[['GEO_CODE (POR)', 'GEO_NAME']].set_index('GEO_CODE (POR)').drop_duplicates()
    
    def trim_labour_data(self, labour_df, col_name):
        labour_df[col_name] = labour_df[col_name].str.extract(r'.*? (.*)')
        return labour_df