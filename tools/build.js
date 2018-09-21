/*eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import colors from 'colors';

process.env.NODE_ENV = 'production';

console.log('Geneartin minfied bundle for production via Webpack...'.blue);

webpack(webpackConfig).run((err, stats) => {
    console.log('Inside'.blue);
    if(err) {
        console.log(err.bold.red);
        return 1;
    }

    const jsonStatus = stats.toJson();

    if (jsonStatus.hasErrors) {
        return jsonStatus.errors.map(error => console.log(error.red));
    }

    if(jsonStatus.hasWarnings) {
        console.log("Webpack genreated the following warning: ".bold.yellow);
        jsonStatus.warnings.map(warning => console.log(warning.yellow));
    }

    console.log(`Webpack status: ${stats}`);

    console.log(`Your app has been complied in production mode and written to /dist`.green);

    return 0;
});