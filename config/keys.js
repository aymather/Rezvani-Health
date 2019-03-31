module.exports = {
    "mongoURI": "mongodb+srv://alec:wheninrome1@rezvani-health-jbtxv.mongodb.net/test?retryWrites=true",
    "PORT": process.env.PORT || 5000,
    "MaleMetablicSettings": {
        'DM': {
            'HDL': [45, 9999],
            'LDL': [100, 130],
            'TC': [145, 260],
            'Ratio': [3, 5],
            'Trigs': [60, 110]
        },
        'CE': {
            'HDL': [-9999, 45],
            'LDL': [130, 9999],
            'TC': [-9999, 240],
            'Ratio': [3.5, 9999],
            'Trigs': [-9999, 110]
        },
        'FPE': {
            'HDL': [45, 9999],
            'LDL': [-9999, 100],
            'TC': [-9999, 200],
            'Ratio': [-9999, 3.5],
            'Trigs': [140, 9999]
        }
    },
    "FemaleMetabolicSettings": {
        'DM': {
            'HDL': [45, 9999],
            'LDL': [100, 130],
            'TC': [160, 240],
            'Ratio': [-9999, 3.5],
            'Trigs': [-9999, 110]
        },
        'CE': {
            'HDL': [-9999, 40],
            'LDL': [180, 9999],
            'TC': [-9999, 240],
            'Ratio': [5, 9999],
            'Trigs': [-9999, 110]
        },
        'FPE': {
            'HDL': [55, 9999],
            'LDL': [-9999, 110],
            'TC': [-9999, 200],
            'Ratio': [-9999, 4],
            'Trigs': [140, 9999]
        }
    }
}