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
                    'assets/js/<%= pkg.name %>.min.js': 'assets/js/<%= pkg.name %>.js'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};