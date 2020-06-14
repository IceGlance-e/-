class Animation {
    static states = {
        removeCluster: 0,
        fall: 1,
        move: 2,
        backMove: 3
    }

    static time = 0;
    static total = 0;
    static state = this.states.removeCluster;
}