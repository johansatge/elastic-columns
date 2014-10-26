module.exports = function(grunt)
{
    grunt.initConfig(
    {
        bower:  grunt.file.readJSON('bower.json'),
        uglify:
        {
            options:
            {
                banner: '/* <%= bower.title %> <%= bower.version %> - <%= bower.homepage %> */\n'
            },
            dist:
            {
                files:
                {
                    'dist/js/<%= bower.name %>.min.js': 'src/js/<%= bower.name %>.js'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};