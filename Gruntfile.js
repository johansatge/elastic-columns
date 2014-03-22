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
                    'src/<%= bower.name %>.min.js': 'src/<%= bower.name %>.js'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};