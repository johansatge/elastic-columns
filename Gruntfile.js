module.exports = function(grunt)
{
    grunt.initConfig(
    {
        pkg: grunt.file.readJSON('package.json'),
        uglify:
        {
            options:
            {
                banner: '/*! <%= pkg.title %> <%= pkg.version %> - <%= pkg.homepage %> */\n'
            },
            dist:
            {
                files:
                {
                    'src/<%= pkg.name %>.min.js': 'src/<%= pkg.name %>.js'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};