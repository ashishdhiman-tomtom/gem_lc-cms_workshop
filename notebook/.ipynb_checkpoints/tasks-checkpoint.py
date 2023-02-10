class LoadTrainingPolygonsForEOPatch(EOTask):
    """
    This task allows the load the training & validation polygons for the EOPatch based on the training & polygons for the AOI
    """

    def __init__(self, train_feature: Tuple[FeatureType, str], val_feature: Tuple[FeatureType, str], train_polygons_filepath: str,
                 val_polygons_filepath: str, pickled_fs: bytes):
        self.pickled_fs: bytes = pickled_fs
        self.train_feature = train_feature
        self.val_feature = val_feature
        self.train_polygons_filepath = train_polygons_filepath
        self.val_polygons_filepath = val_polygons_filepath

    def execute(self, eopatch: EOPatch):
        """Execute EOPatch
            - Transform input geometry to match the DB
            - Query DB for the vector data
            - Filter to create train & val geometries based on the feat ids given
        """
        # transform to WGS84 CRS
        filesystem: FS = unpickle_fs(self.pickled_fs)
        # fetch from database & rename `geom` column to `geometry` so that it can be used as EOLearn Vector feature
        start = time()
        train_polys, val_polys = load_training_polygons_from_filesystem(filesystem, self.train_polygons_filepath,
                                                                        self.val_polygons_filepath)
        LOGGER.info(f'Took {time() - start} to load for EOPatch')

        # save the resulting features
        eopatch[self.train_feature] = train_polys
        eopatch[self.val_feature] = val_polys
        return eopatch